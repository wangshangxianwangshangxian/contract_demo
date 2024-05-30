// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract todo_list {
    uint public task_count = 0;

    struct task {
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => task) public tasks;

    constructor() {}

    function create_task(string memory _content) public returns (uint){
        task_count++;
        tasks[task_count] = task(task_count, _content, false);
        return task_count;
    }

    function toggle_completed(uint _id) public {
        task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
    }

    function get_task(uint _id) public view returns(uint, string memory, bool) {
        task memory _task = tasks[_id];
        return (_task.id, _task.content, _task.completed);
    }

    function get_task_count() public view returns(uint) {
        return task_count;
    }
}