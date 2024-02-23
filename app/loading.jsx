import style from "./loading.module.css";

export default function Loading() {
  return (
    <div
      className={`${style.spinner_container} w-full h-screen grid place-content-center fixed top-0`}
    >
      <div class={style.spinner}></div>
    </div>
  );
}
