import colors from "@/app/colors";
import React, { Component } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TodoModal from "./TodoModal";

interface Todo {
    title: string;
    completed: boolean;
}

interface List {
    name: string;
    color: string;
    todos: Todo[];
}

interface TodoListProps {
    list: List;
    updateList: (updatedList: List) => void;
}

export default class TodoList extends Component<TodoListProps> {
    state = {
        showListVisible: false,
    };
    toggleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible });
    }

    render() {
        const { list, updateList } = this.props;

        const completedCount = list.todos.filter(
            (todo) => todo.completed
        ).length;
        const remainingCount = list.todos.length - completedCount;

        return (
            <View>
                <Modal
                    animationType="slide"
                    visible={this.state.showListVisible}
                    onRequestClose={() => this.toggleListModal()}
                >
                    <TodoModal
                        list={list}
                        closeModal={() => this.toggleListModal()}
                        updateList={this.props.updateList}
                    />
                </Modal>

                <TouchableOpacity
                    style={[
                        styles.listContainer,
                        { backgroundColor: list.color },
                    ]}
                    onPress={() => this.toggleListModal()}
                >
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {list.name}
                    </Text>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.count}>{remainingCount}</Text>
                        <Text style={styles.subTitle}>Remaining</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.subTitle}>Completed</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200,
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.white,
        marginBottom: 18,
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: colors.white,
    },
    subTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.white,
    },
});
