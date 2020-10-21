const express = require("express");
const cors = require("cors");

const app = express();

/**
app.use(
	cors({
		origin: "http://localhost:8080", // ! Permite a conxao apenas da origem http://localhost:8080
	})
);
*/
app.use(cors()); // * Permite qualquer conexao

app.use(express.json());

function logRequest(req, res, next) {
	const { user_name } = req.body;
	const { method, url } = req;
	const dia = new Date(Date.now()).getDate();
	const mes = new Date(Date.now()).getMonth() + 1;
	const ano = new Date(Date.now()).getFullYear();
	const logLabel = `Requisição [${method.toUpperCase()}] ${url} feita pelo usuário ${user_name} em ${
		dia + "/" + mes + "/" + ano
	}`;
	console.log(logLabel);

	return next(); // invoca o proximo middleware
}

app.use(logRequest); // * Utiliza o middleware em todas as rotas

const projects = [{ name: "Novo Projeto" }];

app.get("/projects", (req, res) => {
	return res.json(projects);
});

app.post("/projects/", (req, res) => {
	const { name } = req.body;
	projects.push({ name });
	return res.json(name);
});

app.listen(3333, () => {
	console.log("✔ Back-end started! ✔");
});
