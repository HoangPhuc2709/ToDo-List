import React from "react";
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
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
        const { list, updateList } = this.props;
        list.todos[index].completed = !list.todos[index].completed;
        updateList(list);
    };

    addTodo = () => {
        const { newTodo } = this.state;
        if (!newTodo.trim()) {
            alert("Todo cannot be empty!");
            return;
        }

        const { list, updateList } = this.props;
        list.todos.push({ title: newTodo, completed: false });
        updateList(list);
        this.setState({ newTodo: "" });
        Keyboard.dismiss();
    };

    renderTodo = (todo: Todo, index: number) => (
        <View style={styles.todoContainer}>
            <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
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
                            : "none",
                        color: todo.completed ? colors.gray : colors.black,
                    },
                ]}
            >
                {todo.title}
            </Text>
        </View>
    );

    render() {
        const { list, closeModal } = this.props;
        const { newTodo } = this.state;

        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(
            (todo) => todo.completed
        ).length;

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
                        onPress={closeModal}
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
                            keyExtractor={(item, index) =>
                                `${item.title}-${index}`
                            }
                            contentContainerStyle={{
                                paddingHorizontal: 32,
                                paddingVertical: 64,
                            }}
                            ListEmptyComponent={() => (
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: colors.gray,
                                    }}
                                >
                                    No tasks available. Add a new task!
                                </Text>
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    <View style={[styles.section, styles.footer]}>
                        <TextInput
                            style={[styles.input, { borderColor: list.color }]}
                            onChangeText={(text) =>
                                this.setState({ newTodo: text })
                            }
                            value={newTodo}
                            placeholder="Add a task..."
                        />
                        <TouchableOpacity
                            style={[
                                styles.addTodo,
                                { backgroundColor: list.color },
                            ]}
                            onPress={this.addTodo}
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
