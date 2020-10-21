import React, { useEffect, useState } from "react";
import {
	SafeAreaView,
	FlatList,
	Text,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
	const [projects, setProject] = useState([]);

	async function handleClickAddProject() {
		const res = await api.post(`/projects/`, {
			user_name: "André",
			name: `Novo Projeto ${Date.now()}`,
		});

		setProject([...projects, { name: res.data }]);
	}

	useEffect(() => {
		api.get("/projects").then((res) => {
			setProject(res.data);
			console.log(res.data);
		});
	}, []);

	return (
		<>
			<StatusBar barStyle='light-content' backgroundColor='#7159c1' />
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>Frontend</Text>
				<FlatList
					style={styles.list_projects}
					data={projects}
					keyExtractor={(project) => project.id}
					renderItem={({ item }) => (
						<Text style={styles.project}>{item.name}</Text>
					)}></FlatList>
			</SafeAreaView>
			<TouchableOpacity style={styles.button} onPress={handleClickAddProject}>
				<Text style={styles.button_text}>Adicionar Projeto</Text>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: "#7159c1",
	},
	title: {
		textAlign: "center",
		fontSize: 25,
		margin: 20,
		fontFamily: "Roboto",
		fontWeight: "bold",
		color: "#fff",
	},
	list_projects: {
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	project: {
		fontSize: 15,
		backgroundColor: "#7159c1",
		color: "#fff",
		margin: 10,
		padding: 10,
		borderRadius: 10,
		textAlign: "center",
	},
	button: {
		backgroundColor: "#fff",
		overflow: "hidden",
		padding: 10,
	},
	button_text: {
		textAlign: "center",
		color: "#7159c1",
		fontWeight: "bold",
		fontSize: 20,
	},
});
