import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3333",
});

/**
 * IOS com Emulador: localhost;
 * IOS com físico: IP da Máquina;
 * Android com Emulador: localhost (adb reverse tcp:port tcp:port)
 */

export default api;
