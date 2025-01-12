import React from "react";
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./colors";
import tempData from "./tempData";
import TodoList from "../components/TodoList";
import AddListModal from "../components/AddListModal";

interface Todo {
    title: string;
    completed: boolean;
}

interface List {
    id: number;
    name: string;
    color: string;
    todos: Todo[];
}

export default class App extends React.Component {
    state = {
        addTodoVisible: false,
        lists: tempData,
    };

    toggleAddTodoModal() {
        this.setState({ addTodoVisible: !this.state.addTodoVisible });
    }

    addList = (list: List) => {
        this.setState({
            lists: [
                ...this.state.lists,
                { ...list, id: this.state.lists.length + 1, todos: [] },
            ],
        });
    };

    updateList = (updatedList: List) => {
        this.setState({
            lists: this.state.lists.map((item) =>
                item.id === updatedList.id ? updatedList : item
            ),
        });
    };

    renderList = (list: List) => {
        return <TodoList list={list} updateList={this.updateList} />;
    };

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    visible={this.state.addTodoVisible}
                    onRequestClose={() => this.toggleAddTodoModal()}
                >
                    <AddListModal
                        closeModal={() => this.toggleAddTodoModal()}
                        addList={this.addList}
                    />
                </Modal>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.divider}></View>
                    <Text style={styles.title}>
                        Todo{" "}
                        <Text style={{ fontWeight: "300", color: colors.blue }}>
                            Lists
                        </Text>
                    </Text>
                    <View style={styles.divider}></View>
                </View>
                <View style={{ marginVertical: 48 }}>
                    <TouchableOpacity
                        style={styles.addList}
                        onPress={() => this.toggleAddTodoModal()}
                    >
                        <AntDesign name="plus" size={16} color={colors.blue} />
                    </TouchableOpacity>
                    <Text style={styles.add}>Add List</Text>
                </View>
                <View style={{ height: 275, paddingLeft: 32 }}>
                    <FlatList
                        data={this.state.lists}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => this.renderList(item)}
                        keyboardShouldPersistTaps="always"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    divider: {
        backgroundColor: colors.lightBlue,
        height: 1,
        flex: 1,
        alignSelf: "center",
    },
    title: {
        fontSize: 38,
        fontWeight: "800",
        paddingHorizontal: 64,
    },
    addList: {
        borderWidth: 2,
        borderColor: colors.lightBlue,
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    add: {
        color: colors.blue,
        fontWeight: "600",
        fontSize: 14,
        marginTop: 8,
    },
});
