<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravel React</title>
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @vite('resources/css/app.css')
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap" rel="stylesheet">
</head>

<body class="bg-cs-grey font-rubik mx-4 mb-10">
    @csrf
    <div id="app" edibilities="{{ $edibilities }}" locations="{{ $locations }}" difficulties="{{ $difficulties }}"
        token="{{ $token }}">
    </div>
    <div id="Psychedelic">asdfadsfadsf</div>
</body>

</html>