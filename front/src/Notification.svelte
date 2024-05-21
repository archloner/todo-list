<script>
	import AppConfig from './AppConfig';
	import NotificationType from './NotificationType';

	import _ from 'lodash';

	let notifications = [
    // {
    //   title: 'Test notif',
    //   text: 'This is test notif description',
    //   bgClass: getBackgroundClass(NotificationType.INFO),
    //   hidden: false,
    //   timestampt: new Date()
    // }
  ];

	export function notify(newTitle, newText, newType) {
		let notif = {
			title: newTitle,
			text: newText,
			bgClass: getBackgroundClass(newType),
			hidden: false,
			timestamp: new Date()
		};
		notifications = [notif, ...notifications];

		setTimeout(() => {
			notif.hidden = true;
			_.remove(notifications, (n) => {
				return n == notif;
			});
			notifications = [...notifications];
			// TODO: animate notification popup
		}, AppConfig.NOTIFICATION_TIMEOUT);
	}

	function getBackgroundClass(newType) {
		switch (newType) {
			case NotificationType.INFO:
				return 'bg-medium';
			case NotificationType.SUCCESS:
				return 'bg-success';
			case NotificationType.ERROR:
				return 'bg-error';
		}
	}
</script>

<div class="notification-wrapper">
	{#each notifications as notif}
		<div class="notification {notif.bgClass} {notif.hidden ? 'hide' : ''}">
			<div class="notification-icon">
				<i class="fa-solid fa-bell"></i>
			</div>
			<div class="notification-body">
				<div class="notification-title">{notif.title}</div>
				<div class="notification-text">{notif.text}</div>
			</div>
			<div class="notification-icon">
				<i class="fa-solid fa-xmark close"></i>
			</div>
		</div>
	{/each}
</div>

<style>
	.bg-info {
		background-color: var(--color-medium);
		color: var(--color-white);
	}

	.bg-success {
		background-color: var(--color-low);
		color: var(--color-white);
	}

	.bg-error {
		background-color: var(--color-danger);
		color: var(--color-white);
	}

 /* NOTIFICATIONS */

.notification-wrapper {
  position: absolute;
  top: 20px;
  left: calc(50% - 230px);
  /* left: 20px; */
  width: 460px;
}

.notification {
  position: relative;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: var(--padding-medium);
  box-shadow: 5px 5px 15px rgba(0,0,0,0.15);
  border-radius: 10px;
  animation: notification-show 0.5s ease-out;
  z-index: 10;
  opacity: 0.97;
}

.notification-animate-hide {
  animation: notification-hide 0.5s ease-in;
}

.notification-body {
  flex: 1 1 auto;
  font-size: 14px;
  margin: 0 1rem;
}

.notification-icon {
  
}

.notification-icon .close {
  cursor: pointer;
}

.notification-title {
  font-size: 1.3em;
  font-weight: 400;
  margin-bottom: 0.2em;
}
</style>
