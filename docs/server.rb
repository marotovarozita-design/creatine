require 'webrick'
require 'uri'

PORT = 3000
PREVIEW_DIR = File.dirname(File.expand_path(__FILE__))
ROOT = File.dirname(PREVIEW_DIR)

server = WEBrick::HTTPServer.new(Port: PORT, Logger: WEBrick::Log.new($stdout, WEBrick::Log::INFO))

server.mount_proc '/' do |req, res|
  path = URI.decode_www_form_component(req.path)

  if path == '/' || path == '/index.html'
    file = File.join(PREVIEW_DIR, 'index.html')
  elsif path == '/cart' || path == '/cart.html'
    file = File.join(PREVIEW_DIR, 'cart.html')
  else
    file = File.join(ROOT, path)
  end

  file = File.realpath(file) rescue file

  unless file.start_with?(ROOT) && File.file?(file)
    res.status = 404
    res.body = 'Not found'
    next
  end

  ext = File.extname(file).downcase
  mime = {
    '.html' => 'text/html', '.css' => 'text/css', '.js' => 'application/javascript',
    '.json' => 'application/json', '.png' => 'image/png', '.jpg' => 'image/jpeg',
    '.jpeg' => 'image/jpeg', '.svg' => 'image/svg+xml', '.ico' => 'image/x-icon',
    '.woff2' => 'font/woff2', '.woff' => 'font/woff'
  }

  res['Content-Type'] = mime[ext] || 'application/octet-stream'
  res['Cache-Control'] = 'no-cache'
  res.body = File.binread(file)
end

trap('INT') { server.shutdown }
$stdout.puts "Vitali8 preview running at http://localhost:#{PORT}"
$stdout.flush
server.start
