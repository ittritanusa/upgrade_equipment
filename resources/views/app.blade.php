<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="icon" type="image/png" href="{{ asset('assets/img/logo_tnp.png') }}">
        <title>{{ config('app.name', 'Construction Management') }}</title>
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/App.jsx'])
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
