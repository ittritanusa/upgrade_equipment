<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TireTypeKendaraanModel;
use Illuminate\Http\Request;

class TireTypeKendaraanController extends Controller
{
    /**
     * List Data
     */
    public function index(Request $request)
    {
        try {

            $search = $request->search;
            $limit  = $request->limit ?? 10;

            $query = TireTypeKendaraanModel::query();

            if (!empty($search)) {

                $query->where(function ($q) use ($search) {

                    $q->where(
                        'KodeType',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'Tire',
                        'like',
                        "%{$search}%"
                    );
                });
            }

            $data = $query
                ->orderBy('id', 'desc')
                ->paginate($limit);

            return response()->json([
                'success' => true,
                'data' => $data->items(),
                'meta' => [
                    'current_page' => $data->currentPage(),
                    'last_page'    => $data->lastPage(),
                    'per_page'     => $data->perPage(),
                    'total'        => $data->total(),
                ]
            ]);

        } catch (\Throwable $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);

        }
    }

    /**
     * Detail Data
     */
    public function show($id)
    {
        try {

            $data = TireTypeKendaraanModel::find($id);

            if (!$data) {

                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);

            }

            return response()->json([
                'success' => true,
                'data'    => $data,
            ]);

        } catch (\Throwable $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);

        }
    }

    /**
     * Simpan Data
     */
    public function store(Request $request)
    {
        try {

            $validated = $request->validate([
                'KodeType'  => 'required|max:50',
                'Tire'      => 'required|max:255',
            ]);

            $data = TireTypeKendaraanModel::insert([
                'KodeType'  => trim($validated['KodeType']),
                'Tire'      => trim($validated['Tire']),
                'Status'    => 1,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil ditambahkan',
                'data'    => $data,
            ]);

        } catch (\Throwable $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);

        }
    }

    /**
     * Update Data
     */
    public function update(Request $request, $id)
    {
        try {
            $data = TireTypeKendaraanModel::find($id);

            if (!$data) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);
            }

            // 2. Validasi input
            $validated = $request->validate([
                'KodeType'  => 'required|max:50',
                'Tire'      => 'required|max:255',
                'Status'    => 'required|integer|in:1,2',
            ]);

            // Sesuaikan key array dengan nama kolom di database Anda
            $update = TireTypeKendaraanModel::where('id', $id)->update([
                'KodeType'  => trim($validated['KodeType']),
                'Tire'      => trim($validated['Tire']),
                'Status'    => $validated['Status'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diperbarui',
                'data'    => $data->fresh(),
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Menangani error validasi secara spesifik
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors'  => $e->errors()
            ], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan sistem: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Hapus Data
     */
    public function destroy($id)
    {
        try {

            $data = TireTypeKendaraanModel::find($id);

            if (!$data) {

                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);

            }

            // hapus data
            TireTypeKendaraanModel::where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil dihapus',
            ]);

        } catch (\Throwable $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);

        }
    }
}
