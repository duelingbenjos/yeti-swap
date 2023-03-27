
import root from '../root.svelte';
import { set_building } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_private_env, set_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"" + assets + "/favicon.ico\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t<title>YETI SWAP</title>\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<!-- <script src=\"https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js\"></script> -->\n\t\t<div>" + body + "</div>\n\t\t<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n\t\t<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n\t\t<!-- <link\n\t\t\thref=\"https://fonts.googleapis.com/css2?family=Poppins:wght@200;700&display=swap\"\n\t\t\trel=\"stylesheet\"\n\t\t/> -->\n\n\t</body>\n\t<style>\n\t\tdiv {\n\t\t\tz-index: 1;\n\t\t}\n\t\thtml,\n\t\tbody {\n\t\t\tmargin: 0;\n\t\t\tpadding: 0;\n\t\t\tcolor: #C6B594;\n\t\t\tfont-family: sans-serif;\n\t\t\toverflow-x: hidden;\n\t\t\theight: 100vh;\n\t\t\t-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */\n\t\t\t-moz-box-sizing: border-box; /* Firefox, other Gecko */\n\t\t\tbox-sizing: border-box; /* Opera/IE 8+ */\n\t\t\t/* background-color: #19131c; */\n\t\t\t\n\t\t}\n\t\t.background {\n\t\t\theight: 100vh;\n\t\t\twidth: 100vw;\n\t\t\t/* overflow-x: hidden; */\n\t\t\t-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */\n\t\t\t-moz-box-sizing: border-box; /* Firefox, other Gecko */\n\t\t\tbox-sizing: border-box; /* Opera/IE 8+ */\n\t\t\tbackground-color: #19131C;\n\t\t\tposition: fixed;\n\t\t\t/* display: block; */\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tz-index: -10;\n\t\t}\n\t</style>\n</html>\n",
		error: ({ status, message }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,\n\t\t\t\t\tUbuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "ej2t01"
};

export function get_hooks() {
	return {};
}

export { set_assets, set_building, set_private_env, set_public_env };
