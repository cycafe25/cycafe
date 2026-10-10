$port = 8080
$prefix = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Output "Server running at $prefix"
Start-Process $prefix

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($path) -or $path -eq '/') {
            $path = 'index.html'
        }
        
        $fullPath = Join-Path $PSScriptRoot $path
        if (-not (Test-Path $fullPath -PathType Leaf) -and [string]::IsNullOrWhiteSpace([System.IO.Path]::GetExtension($path))) {
            # Let the client-side router handle direct dashboard routes such as /customers.
            $path = 'index.html'
            $fullPath = Join-Path $PSScriptRoot $path
        }
        if (Test-Path $fullPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            if ($path.EndsWith('.html')) {
                $response.ContentType = 'text/html; charset=utf-8'
                $response.AddHeader('Cache-Control', 'no-cache, must-revalidate')
            }
            elseif ($path -eq 'sw.js') {
                $response.ContentType = 'application/javascript; charset=utf-8'
                $response.AddHeader('Cache-Control', 'no-cache, must-revalidate')
            }
            elseif ($path.EndsWith('.js')) {
                $response.ContentType = 'application/javascript; charset=utf-8'
                $response.AddHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
            }
            elseif ($path.EndsWith('.css')) {
                $response.ContentType = 'text/css; charset=utf-8'
                $response.AddHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
            }
            elseif ($path.EndsWith('.json')) {
                $response.ContentType = 'application/json; charset=utf-8'
                $response.AddHeader('Cache-Control', 'public, max-age=86400')
            }
            elseif ($path.EndsWith('.svg')) {
                $response.ContentType = 'image/svg+xml'
                $response.AddHeader('Cache-Control', 'public, max-age=604800')
            }
            elseif ($path.EndsWith('.webp')) {
                $response.ContentType = 'image/webp'
                $response.AddHeader('Cache-Control', 'public, max-age=604800')
            }
            elseif ($path.EndsWith('.ico')) {
                $response.ContentType = 'image/x-icon'
                $response.AddHeader('Cache-Control', 'public, max-age=604800')
            }
            elseif ($path.EndsWith('.jpeg') -or $path.EndsWith('.jpg')) {
                $response.ContentType = 'image/jpeg'
                $response.AddHeader('Cache-Control', 'public, max-age=604800')
            }
            elseif ($path.EndsWith('.png')) {
                $response.ContentType = 'image/png'
                $response.AddHeader('Cache-Control', 'public, max-age=604800')
            }
            else {
                $response.ContentType = 'application/octet-stream'
            }
            
            $response.KeepAlive = $true
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    } catch {
        # ignore client disconnect
    }
}
