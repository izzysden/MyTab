import { useEffect, useState } from "react";
import styled from "styled-components";
import { TodoListType } from "../../assets/types/todoList";

interface TodoListItemProps {
  text: string;
  itemId: number;
  isChecked: boolean;
  todoState: TodoListType[];
  setTodoState: React.Dispatch<React.SetStateAction<TodoListType[]>>;
}

const TodoListItem = ({
  text,
  itemId,
  isChecked,
  todoState,
  setTodoState,
}: TodoListItemProps) => {
  const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    let temp: TodoListType[] = structuredClone(todoState);
    const targetId: number = parseInt(e.currentTarget.id);

    temp.forEach((v) => {
      if (v.index === targetId) v.isChecked = e.currentTarget.checked;
    });

    if (e.currentTarget.checked === true) {
      const todoList: TodoListType[] = JSON.parse(
        localStorage.getItem("todoList")!
      );

      localStorage.setItem(
        "todoList",
        JSON.stringify(
          todoList.filter((v) => {
            return targetId !== v.index;
          })
        )
      );
    } else {
      localStorage.setItem(
        "todoList",
        JSON.stringify(
          temp.filter((v) => {
            return v.isChecked === false;
          })
        )
      );
    }

    setTodoState(temp);
  };

  return (
    <ItemWrapper key={itemId} isChecked={isChecked}>
      <input
        id={`${itemId}`}
        type="checkbox"
        defaultChecked={isChecked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleCheckbox(e)}
      />
      <label htmlFor={`${itemId}`}>{text}</label>
    </ItemWrapper>
  );
};

const TodoList = () => {
  const [todoState, setTodoState] = useState<TodoListType[]>([]);

  const addItem = () => {
    const text = prompt("Please type your objective of the day.", "");
    if (text) {
      const data: TodoListType = {
        text: text,
        index: new Date().getTime(),
        isChecked: false,
      };
      localStorage.setItem(
        "todoList",
        JSON.stringify([
          data,
          ...todoState.filter((v) => {
            return v.isChecked === false;
          }),
        ])
      );
      setTodoState([data, ...todoState]);
    }
  };

  useEffect(() => {
    const cachedTodoList: TodoListType[] = JSON.parse(
      localStorage.getItem("todoList")!
    ) as TodoListType[];

    if (cachedTodoList && todoState.length === 0)
      setTodoState([...todoState, ...cachedTodoList]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <h2>
        To-do List
        <button type="button" onClick={() => addItem()}>
          +
        </button>
      </h2>
      <ul>
        {todoState.map((v) => (
          <TodoListItem
            key={v.index}
            text={v.text}
            itemId={v.index}
            isChecked={v.isChecked}
            todoState={todoState}
            setTodoState={setTodoState}
          />
        ))}
      </ul>
    </Wrapper>
  );
};

export default TodoList;

const Wrapper = styled.div`
  height: 228px;

  > h2 {
    padding-bottom: 8px;
    margin-bottom: 8px;

    display: flex;
    justify-content: space-between;

    font-size: ${({ theme }) => theme.fontSizes.text};

    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};

    > button {
      background-color: transparent;

      color: ${({ theme }) => theme.colors.grey};
      font-size: ${({ theme }) => theme.fontSizes.text};

      border: none;

      ${({ theme }) => theme.common.hoverEffect}
    }
  }

  > ul {
    height: 182px;

    overflow: hidden;
    overflow-x: overlay;
    overflow-y: scroll;
  }
`;

interface ItemWrapperProps {
  isChecked: boolean;
}

const ItemWrapper = styled.li<ItemWrapperProps>`
  display: flex;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSizes.text};

  ${({ theme }) =>
    (props) =>
      props.isChecked === true &&
      `> label { color: ${theme.colors.grey}; text-decoration: line-through; }`}

  > input {
    margin-right: 6px;

    min-width: 20px;
    min-height: 20px;
  }
`;
