import React from 'react';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

export default function Dashboard() {

    return (
        <PortalLayout>

            {/* HEADER PAGE */}
            <div className="mb-6">

                <h1 className="text-2xl font-bold text-gray-800">
                    Dashboard
                </h1>

                <p className="text-sm text-gray-500">
                    Overview Fleet Performance
                </p>

            </div>

            {/* CARD SUMMARY */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

                <div className="bg-white rounded-lg border p-4">
                    <p className="text-sm text-gray-500">
                        Total Unit
                    </p>

                    <h2 className="text-3xl font-bold">
                        20
                    </h2>
                </div>

                <div className="bg-white rounded-lg border p-4">
                    <p className="text-sm text-gray-500">
                        Available
                    </p>

                    <h2 className="text-3xl font-bold text-green-600">
                        15
                    </h2>
                </div>

                <div className="bg-white rounded-lg border p-4">
                    <p className="text-sm text-gray-500">
                        On Trip
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600">
                        3
                    </h2>
                </div>

                <div className="bg-white rounded-lg border p-4">
                    <p className="text-sm text-gray-500">
                        Maintenance
                    </p>

                    <h2 className="text-3xl font-bold text-red-500">
                        2
                    </h2>
                </div>

            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                <div className="bg-white rounded-lg border p-5 min-h-[350px]">
                    Grafik Revenue
                </div>

                <div className="bg-white rounded-lg border p-5 min-h-[350px]">
                    Alert & Notification
                </div>

                <div className="bg-white rounded-lg border p-5 min-h-[350px]">
                    Status Unit
                </div>

                <div className="bg-white rounded-lg border p-5 min-h-[350px]">
                    Recent Activity
                </div>

            </div>

        </PortalLayout>
    );
}