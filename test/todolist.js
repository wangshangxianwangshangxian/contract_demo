const { ethers } = require("hardhat")

describe('todolist', function() {
	let todolist
	const contract_address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

	before(async function () {
		const factory = await ethers.getContractFactory('todo_list')
		todolist = factory.attach(contract_address)		
	})

	it('Create a new task', async function () {
		const tx = await todolist.create_task('hello task')
		const receipt = await tx.wait()
		const task_id = receipt.events[0].args.id
		const info = await todolist.get_task(task_id)
		console.log(info)
	})
})