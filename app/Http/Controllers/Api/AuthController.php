<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {

            $request->validate([
                'username' => 'required|string|min:3|max:20',
                'password' => 'required|string|min:3|max:20',
            ]);

            $username = trim($request->username);
            $password = trim($request->password);

            $user = User::where('username', $username)->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Username dan password tidak sesuai.'
                ], 401);
            }

            // Support password lama SHA1 + password baru BCRYPT
            $isPasswordValid = false;

            if (
                strlen($user->password) === 40 &&
                ctype_xdigit($user->password)
            ) {

                $isPasswordValid = sha1($password) === $user->password;

                // Migrasi otomatis ke bcrypt
                if ($isPasswordValid) {

                    $user->password = Hash::make($password);
                    $user->save();
                }
            } else {

                $isPasswordValid = Hash::check(
                    $password,
                    $user->password
                );
            }

            if (!$isPasswordValid) {
                return response()->json([
                    'success' => false,
                    'message' => 'Username dan password tidak sesuai.'
                ], 401);
            }

            if (empty($user->role)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Username tidak memiliki akses.'
                ], 403);
            }

            if ($user->blokir === 'Y') {
                return response()->json([
                    'success' => false,
                    'message' => 'Akun tidak dapat digunakan. Silahkan hubungi Tim IT.'
                ], 403);
            }

            // Session seperti CI
            Session::put([
                'id'           => $user->id,
                'username'     => $user->username,
                'name'         => $user->nama,
                'role'         => $user->role,
                'jabatan'      => $user->jabatan,
                'unitbisnis'   => $user->unitbisnis,
                'working_area' => $user->working_area,
            ]);

            // Session ERP
            if (
                in_array(
                    strtolower($user->role),
                    [
                        'driver',
                        'pengawas trucking',
                        'equipment admin'
                    ]
                ) &&
                !empty($user->id_erp)
            ) {
                Session::put('idErp', $user->id_erp);
            }

            return response()->json([
                'success' => true,
                'code'  => 200,
                'message' => 'Login berhasil',
                'user' => [
                    'id'           => $user->id,
                    'username'     => $user->username,
                    'nama'         => $user->nama,
                    'role'         => $user->role,
                    'jabatan'      => $user->jabatan,
                    'unitbisnis'   => $user->unitbisnis,
                    'working_area' => $user->working_area,
                ]
            ]);

        } catch (\Throwable $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'line'    => $e->getLine(),
            ], 500);

        }
    }

    public function logout(Request $request)
    {
        Session::flush();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil'
        ]);
    }

    public function me()
    {
        return response()->json([
            'id'           => Session::get('id'),
            'username'     => Session::get('username'),
            'name'         => Session::get('name'),
            'role'         => Session::get('role'),
            'jabatan'      => Session::get('jabatan'),
            'unitbisnis'   => Session::get('unitbisnis'),
            'working_area' => Session::get('working_area'),
            'idErp'        => Session::get('idErp'),
        ]);
    }
}