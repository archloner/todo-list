import { createEventDispatcher } from 'svelte';
import NotificationType from './NotificationType';

async function getRequest(url) {
	let dispatch = createEventDispatcher();

	function notify(title, text, type) {
		dispatch('notify', { title, text, type });
	}

	try {
		let res = await fetch(url);
		if (!res.ok) {
			throw new Error(`API request failed with status ${res.status}`);
		}
		let data = await res.json();
		// notify('Data loaded', 'Data successfully fetched from the API', NotificationType.SUCCESS);
		return data;
	} catch (error) {
		console.log('Error fetching data: ', error);
		notify('Error', 'Error while loading data from the service', NotificationType.ERROR);

		return null;
	}
}

async function postRequest(url, data) {
	try {
		let res = await fetch(url, {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (!res.ok) {
			throw new Error(`API request failed with status ${res.status}`);
		}
		let respData = await res.json();
		console.log(respData);
		return respData;
	} catch (error) {
		console.log(`Error posting data ${error}`);
		return null;
	}
}

async function deleteRequest(url) {
	try {
		let res = await fetch(url, {
			method: 'DELETE'
		});
		if (!res.ok) {
			throw new Error(`API request failed with status ${res.status}`);
		}
		return true;
	} catch (error) {
		console.log(`Error deleting data ${error}`);
		return null;
	}
}

export { getRequest, postRequest, deleteRequest };
