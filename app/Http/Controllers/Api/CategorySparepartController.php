<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CategoriSparepartModel;
use Illuminate\Http\Request;

class CategorySparepartController extends Controller
{
    /**
     * List Data
     */
    public function index(Request $request)
    {
        try {

            $search = $request->search;
            $limit  = $request->limit ?? 10;

            $query = CategoriSparepartModel::query();

            if (!empty($search)) {

                $query->where(function ($q) use ($search) {

                    $q->where(
                        'category_code',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'category_name',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'description',
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

            $data = CategoriSparepartModel::find($id);

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
                'category_code' => 'required|max:50|unique:m_maintenance_sparepart_categories,category_code',
                'category_name' => 'required|max:255',
                'description'   => 'nullable|max:255',
            ]);

            $data = CategoriSparepartModel::insert([
                'category_code' => trim($validated['category_code']),
                'category_name' => trim($validated['category_name']),
                'description'   => trim($validated['description'])
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
            $data = CategoriSparepartModel::find($id);

            if (!$data) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);
            }

            // 2. Validasi input
            $validated = $request->validate([
                'category_name' => 'required|max:255',
                'description'   => 'nullable|max:255',
            ]);

            // Sesuaikan key array dengan nama kolom di database Anda
            $update = CategoriSparepartModel::where('id', $id)->update([
                'category_name' => trim($validated['category_name']),
                'description'   => trim($validated['description'])
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

            $data = CategoriSparepartModel::find($id);

            if (!$data) {

                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);

            }

            // hapus data
            CategoriSparepartModel::where('id', $id)->delete();

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