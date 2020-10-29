<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Lab Imob</title>

        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    </head>
    <body>
        <div id="app">
            <div class="container">
                <h1>Lab Imob</h1>

                <example-component></example-component>
            </div>
        </div>
    </body>
    <script src="{{ asset('js/app.js') }}"></script>
</html>
