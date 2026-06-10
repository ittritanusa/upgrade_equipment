<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KodePosModel;
use Illuminate\Http\Request;

class KodePosController extends Controller
{
    /**
     * List Data
     */
    public function index(Request $request)
    {
        try {

            $search = $request->search;
            $limit  = $request->limit ?? 10;

            $query = KodePosModel::query();

            if (!empty($search)) {

                $query->where(function ($q) use ($search) {

                    $q->where(
                        'provinsi',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'kota',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'kecamatan',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'kelurahan',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'kodepos',
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

            $data = KodePosModel::find($id);

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
                'provinsi'      => 'required|max:50',
                'kota'          => 'required|max:50',
                'kecamatan'     => 'required|max:255',
                'kelurahan'     => 'required|max:255',
                'kodepos'       => 'required|max:10|unique:m_kodepos,kodepos',
            ]);

            $data = KodePosModel::insert([
                'provinsi'      => trim($validated['provinsi']),
                'kota'          => trim($validated['kota']),
                'kecamatan'     => trim($validated['kecamatan']),
                'kelurahan'     => trim($validated['kelurahan']),
                'kodepos'       => trim($validated['kodepos'])
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
            $data = KodePosModel::find($id);

            if (!$data) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);
            }

            // 2. Validasi input
            $validated = $request->validate([
                'provinsi'      => 'required|max:50',
                'kota'          => 'required|max:50',
                'kecamatan'     => 'required|max:255',
                'kelurahan'     => 'required|max:255',
                'kodepos'       => "required|max:10|unique:m_kodepos,kodepos,$id",
            ]);

            // Sesuaikan key array dengan nama kolom di database Anda
            $update = KodePosModel::where('id', $id)->update([
                'provinsi'      => trim($validated['provinsi']),
                'kota'          => trim($validated['kota']),
                'kecamatan'     => trim($validated['kecamatan']),
                'kelurahan'     => trim($validated['kelurahan']),
                'kodepos'       => trim($validated['kodepos'])
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

            $data = KodePosModel::find($id);

            if (!$data) {

                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);

            }

            // hapus data
            KodePosModel::where('id', $id)->delete();

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