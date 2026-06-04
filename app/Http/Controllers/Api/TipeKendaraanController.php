<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TipeKendaraanModel;
use Illuminate\Http\Request;

class TipeKendaraanController extends Controller
{
    /**
     * List Data
     */
    public function index(Request $request)
    {
        try {

            $search = $request->search;
            $limit  = $request->limit ?? 10;

            $query = TipeKendaraanModel::query();

            if (!empty($search)) {

                $query->where(function ($q) use ($search) {

                    $q->where(
                        'KodeUnit',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'KodeType',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'Type',
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

            $data = TipeKendaraanModel::find($id);

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
                'KodeUnit'  => 'required|max:50',
                'KodeType'  => 'required|max:50|unique:m_type_kendaraan,KodeType',
                'Type'      => 'required|max:255',
            ]);

            $data = TipeKendaraanModel::insert([
                'KodeUnit'  => trim($validated['KodeUnit']),
                'KodeType'  => trim($validated['KodeType']),
                'Type'      => trim($validated['Type']),
                'status'    => 1,
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
            $data = TipeKendaraanModel::find($id);

            if (!$data) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);
            }

            // 2. Validasi input
            $validated = $request->validate([
                'KodeUnit'  => 'required|max:50',
                'KodeType'  => 'required|max:50|unique:m_type_kendaraan,KodeType,' . $id . ',id',
                'Type'      => 'required|max:255',
                'Status'    => 'required|integer|in:1,2',
            ]);

            // Sesuaikan key array dengan nama kolom di database Anda
            $update = TipeKendaraanModel::where('id', $id)->update([
                'KodeUnit'  => trim($validated['KodeUnit']),
                'KodeType'  => trim($validated['KodeType']),
                'Type'      => trim($validated['Type']),
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

            $data = TipeKendaraanModel::find($id);

            if (!$data) {

                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);

            }

            // hapus data
            TipeKendaraanModel::where('id', $id)->delete();

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