$port = 8080
$root = "c:\Users\aksha\Downloads\DV RESOLVE\new work"
$prefix = "http://localhost:$port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Server running at $prefix" -ForegroundColor Green

while ($listener.IsListening) {
    try {
        $context  = $listener.GetContext()
        $request  = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($path) -or $path -eq '/') { $path = 'index.html' }

        $fullPath = Join-Path $root $path
        if (-not (Test-Path $fullPath -PathType Leaf) -and [string]::IsNullOrWhiteSpace([System.IO.Path]::GetExtension($path))) {
            # Client-side dashboard routes (for example /customers) are served by index.html.
            $path = 'index.html'
            $fullPath = Join-Path $root $path
        }

        if (Test-Path $fullPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            if ($path -eq 'sw.js') {
                $response.ContentType = 'application/javascript; charset=utf-8'
                $response.AddHeader('Cache-Control', 'no-cache, must-revalidate')
            } else {
                switch -Wildcard ($path) {
                    '*.html' { 
                        $response.ContentType = 'text/html; charset=utf-8'
                        $response.AddHeader('Cache-Control', 'no-cache, must-revalidate')
                    }
                    '*.js'   { 
                        $response.ContentType = 'application/javascript; charset=utf-8'
                        $response.AddHeader('Cache-Control', 'no-cache, must-revalidate')
                    }
                    '*.css'  { 
                        $response.ContentType = 'text/css; charset=utf-8'
                        $response.AddHeader('Cache-Control', 'no-cache, must-revalidate')
                    }
                    '*.json' { 
                        $response.ContentType = 'application/json; charset=utf-8'
                        $response.AddHeader('Cache-Control', 'public, max-age=86400')
                    }
                    '*.png'  { 
                        $response.ContentType = 'image/png'
                        $response.AddHeader('Cache-Control', 'public, max-age=604800')
                    }
                    '*.jpg'  { 
                        $response.ContentType = 'image/jpeg'
                        $response.AddHeader('Cache-Control', 'public, max-age=604800')
                    }
                    '*.jpeg' { 
                        $response.ContentType = 'image/jpeg'
                        $response.AddHeader('Cache-Control', 'public, max-age=604800')
                    }
                    '*.svg'  { 
                        $response.ContentType = 'image/svg+xml'
                        $response.AddHeader('Cache-Control', 'public, max-age=604800')
                    }
                    '*.ico'  { 
                        $response.ContentType = 'image/x-icon'
                        $response.AddHeader('Cache-Control', 'public, max-age=604800')
                    }
                    default  { 
                        $response.ContentType = 'application/octet-stream' 
                    }
                }
            }
            $response.KeepAlive = $true
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    } catch { }
}
