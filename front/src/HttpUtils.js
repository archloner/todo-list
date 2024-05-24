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
		console.log(res.status)
		if (!res.ok || res.status < 200 || res.status >= 300) {
			throw new Error(`API request failed with status ${res.status}`);
		}
		console.log(res);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

async function putRequest(url, data) {
	try {
		let res = await fetch(url, {
			method: 'PUT', // or 'PUT'
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		console.log(res.status)
		if (!res.ok || res.status < 200 || res.status >= 300) {
			throw new Error(`API request failed with status ${res.status}`);
		}
		console.log(res);
		return res;
	} catch (error) {
		console.log(error);
		return error;
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
		return res;
	} catch (error) {
		console.log(`Error deleting data ${error}`);
		return error;
	}
}

export { getRequest, postRequest, putRequest, deleteRequest };
