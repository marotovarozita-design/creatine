import http.server
import os
import sys
import urllib.parse

PORT = 3000
PREVIEW_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(PREVIEW_DIR)

MIME = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
}


class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        url_path = urllib.parse.unquote(parsed.path)

        if url_path in ('/', '/index.html', '/preview', '/preview/', '/preview/index.html'):
            file_path = os.path.join(PREVIEW_DIR, 'index.html')
        elif url_path in ('/cart', '/cart.html'):
            file_path = os.path.join(PREVIEW_DIR, 'cart.html')
        else:
            file_path = os.path.join(ROOT, url_path.lstrip('/'))

        file_path = os.path.realpath(file_path)
        if not file_path.startswith(ROOT):
            self.send_error(403)
            return

        if not os.path.isfile(file_path):
            self.send_error(404)
            return

        ext = os.path.splitext(file_path)[1].lower()
        content_type = MIME.get(ext, 'application/octet-stream')

        with open(file_path, 'rb') as f:
            data = f.read()

        self.send_response(200)
        self.send_header('Content-Type', content_type)
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, format, *args):
        print(f"[vitali8] {args[0]}", flush=True)


if __name__ == '__main__':
    server = http.server.HTTPServer(('', PORT), Handler)
    print(f"Vitali8 preview running at http://localhost:{PORT}", flush=True)
    server.serve_forever()
