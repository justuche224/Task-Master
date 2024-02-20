import TaskContainer from "./task/TaskContainer";

const UpcomingEvents = () => {
  return (
    <section>
      <h1 className="blue_gradient text-4xl font-bold">Tasks</h1>
      <hr className="w-full" />
      <br />
      <TaskContainer />
    </section>
  );
};

export default UpcomingEvents;
