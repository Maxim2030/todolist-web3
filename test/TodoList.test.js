const { assert } = require("chai");

const TodoList = artifacts.require("./TodoList.sol");

contract("TodoList", (accounts) => {
  //
  before(async () => {
    this.todoList = await TodoList.deployed();
  });

  it("deployed successfully", async () => {
    const address = await this.todoList.address;

    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("list tasks", async () => {
    const taskCount = await this.todoList.taskCount();
    const task = await this.todoList.tasks(taskCount);

    assert.equal(task.id.toNumber(), taskCount.toNumber());
    assert.equal(task.content, "Check out dappuniversity.com");
    assert.equal(task.completed, false);
    assert.equal(taskCount.toNumber(), 1);
  });

  it("creates tasks", async () => {
    const taskContent = "A new task";
    const result = await this.todoList.createTask(taskContent);
    const taskCount = await this.todoList.taskCount();

    assert.equal(taskCount, 2);

    // console.log("result =>", result);
    const event = result.logs[0].args;

    assert.equal(event.id.toNumber(), 2);
    assert.equal(event.content, taskContent);
    assert.equal(event.completed, false);
  });
});
