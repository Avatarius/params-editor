import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import styles from "./App.module.scss";

interface IParam {
  id: number;
  name: string;
  type: string;
}

interface IParamValue {
  paramId: number;
  value: string;
}

interface IModel {
  paramValue: IParamValue[];
}

interface IData extends IParam {
  value: string;
}

interface IProps {
  params: IParam[];
  model: IModel;
}

const initialModel: IModel = {
  paramValue: [
    {
      paramId: 1,
      value: "Красный",
    },
    { paramId: 2, value: "100" },
    { paramId: 3, value: "150" },
    { paramId: 4, value: "300" },
  ],
};

const initialParams: IParam[] = [
  { id: 1, name: "Цвет", type: "Внешность" },
  { id: 2, name: "Длинна", type: "Размер" },
  { id: 3, name: "Ширина", type: "Размер" },
  { id: 4, name: "Высота", type: "Размер" },
];

interface IInputProps {
  id: number;
  label: string;
  value: string;
  setData: Dispatch<SetStateAction<IData[]>>;
}

function App() {
  const [model] = useState<IModel>(initialModel);
  const [params] = useState<IParam[]>(initialParams);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.header__title}>Params Editor</h1>
      </header>
      <main className={styles.main}>
        <Editor params={params} model={model} />
      </main>
    </div>
  );
}

function Editor({ params, model }: IProps) {
  const uniqueParams = [
    ...new Map(params.map((item) => [item.id, item])).values(),
  ];

  const initialData = uniqueParams.map((item) => {
    const value =
      model.paramValue.find((v) => v.paramId === item.id)?.value ?? "";
    return { ...item, value };
  });

  const [data, setData] = useState<IData[]>(initialData);

  return (
    <section>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        {data.map((item) => (
          <Input
            key={item.id}
            id={item.id}
            label={item.name}
            value={item.value}
            setData={setData}
          />
        ))}
      </form>
    </section>
  );
}

function Input({ id, label, value, setData }: IInputProps) {
  function handleChange(e: ChangeEvent) {
    const { value } = e.target as HTMLInputElement;
    setData((oldData) => {
      return oldData.map((data) => {
        if (data.id === id) {
          return { ...data, value: value };
        } else {
          return { ...data };
        }
      });
    });
  }
  return (
    <label className={styles.form__label}>
      <span className={styles.form__span}>{label}</span>
      <input
        value={value}
        onChange={handleChange}
        className={styles.form__input}
      ></input>
    </label>
  );
}

export default App;
