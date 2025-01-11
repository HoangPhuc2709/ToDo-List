import React from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "@/app/colors";

interface Todo {
    title: string;
    completed: boolean;
}

interface List {
    name: string;
    color: string;
    todos: Todo[];
}

interface TodoModalProps {
    list: List;
    closeModal: () => void;
    updateList: (list: List) => void;
}

export default class TodoModal extends React.Component<TodoModalProps> {
    state = {
        newTodo: "",
    };
    toggleTodoCompleted = (index: number) => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list);
    };

    renderTodo = (todo: Todo, index: number) => {
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity
                    onPress={() => this.toggleTodoCompleted(index)}
                >
                    <Ionicons
                        name={todo.completed ? "checkbox" : "checkbox-outline"}
                        size={24}
                        color={colors.gray}
                        style={{ width: 32 }}
                    />
                </TouchableOpacity>
                <Text
                    style={[
                        styles.todoText,
                        {
                            textDecorationLine: todo.completed
                                ? "line-through"
                                : "none", // Sửa lỗi chính tả
                            color: todo.completed ? colors.gray : colors.black,
                        },
                    ]}
                >
                    {todo.title}
                </Text>
            </View>
        );
    };
    render() {
        const list = this.props.list;

        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(
            (todo) => todo.completed
        ).length;
        const { closeModal } = this.props;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            top: 64,
                            right: 32,
                            zIndex: 10,
                        }}
                        onPress={this.props.closeModal}
                    >
                        <AntDesign
                            name="close"
                            size={24}
                            color={colors.black}
                        />
                    </TouchableOpacity>

                    <View
                        style={[
                            styles.section,
                            styles.header,
                            { borderBottomColor: list.color },
                        ]}
                    >
                        <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.taskCount}>
                                {completedCount} of {taskCount} tasks
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.section, { flex: 1 }]}>
                        <FlatList
                            data={list.todos}
                            renderItem={({ item, index }) =>
                                this.renderTodo(item, index)
                            }
                            keyExtractor={(item) => item.title}
                            contentContainerStyle={{
                                paddingHorizontal: 32,
                                paddingVertical: 64,
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={[styles.section, styles.footer]}>
                        <TextInput
                            style={[styles.input, { borderColor: list.color }]}
                        ></TextInput>
                        <TouchableOpacity
                            style={[
                                styles.addTodo,
                                { backgroundColor: list.color },
                            ]}
                        >
                            <AntDesign
                                name="plus"
                                size={16}
                                color={colors.white}
                            />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 20,
    },
    section: {
        flex: 1,
        alignSelf: "stretch",
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3,
    },
    title: {
        fontWeight: "800",
        fontSize: 30,
        color: colors.black,
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: "600",
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 10,
        paddingHorizontal: 8,
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    todoText: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 16,
    },
});
