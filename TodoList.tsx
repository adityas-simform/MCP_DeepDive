/**
 * TodoList
 * Simple todo list with the ability to add, toggle, and remove items.
 *
 * @format
 */

import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
};

let nextId = 0;
function generateId(): string {
  nextId += 1;
  return `todo-${Date.now()}-${nextId}`;
}

function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [draft, setDraft] = useState('');

  const addTodo = () => {
    const title = draft.trim();
    if (title.length === 0) {
      return;
    }

    setTodos(prev => [{ id: generateId(), title, completed: false }, ...prev]);
    setDraft('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={draft}
          onChangeText={setDraft}
          placeholder="Add a new todo"
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
          onPress={addTodo}
          accessibilityRole="button"
          accessibilityLabel="Add todo">
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={todos.length === 0 && styles.emptyContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No todos yet. Add one above!</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable
              style={styles.itemTextWrapper}
              onPress={() => toggleTodo(item.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: item.completed }}>
              <Text
                style={[
                  styles.itemText,
                  item.completed && styles.itemTextCompleted,
                ]}>
                {item.completed ? '☑' : '☐'} {item.title}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => removeTodo(item.id)}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${item.title}`}>
              <Text style={styles.removeText}>✕</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  addButtonPressed: {
    opacity: 0.7,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  itemTextWrapper: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
  },
  itemTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  removeText: {
    fontSize: 16,
    color: '#ff3b30',
    paddingHorizontal: 8,
  },
});

export default TodoList;
