const fs = require("fs");
const os = require("os");
const path = require("path");

function getLocalIp() {
	const interfaces = os.networkInterfaces();
	for (const name of Object.keys(interfaces)) {
		for (const iface of interfaces[name]) {
			if (iface.family === "IPv4" && !iface.internal) {
				return iface.address;
			}
		}
	}
	return "127.0.0.1";
}

const localIp = getLocalIp();
const envPath = path.resolve(__dirname, "../.env.development");

const port = 3000;
const content = `API_BASE_URL=http://${localIp}:${port}\n`;

fs.writeFileSync(envPath, content);
console.log(`✅ Updated .env.development with IP: ${localIp}`);
