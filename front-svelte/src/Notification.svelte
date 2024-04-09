<script>
	import AppConfig from './AppConfig';
	import NotificationType from './NotificationType';

	export function notify(newTitle, newText, newType) {
			title = newTitle;
			text = newText;
      bgClass = getBackgroundClass(newType)
			hidden = false;

			setTimeout(() => {
				hidden = true;
				// TODO: animate notification popup
			}, AppConfig.NOTIFICATION_TIMEOUT);
		}

	let hidden = true;
	let title;
	let text;
	let type;
  let bgClass;

	function getBackgroundClass(newType) {
		switch (newType) {
			case NotificationType.INFO:
				return 'bg-medium';
			case NotificationType.SUCCESS:
				return 'bg-success';
      case NotificationType.ERROR:
        return 'bg-error'
		}
	}
</script>

<div class="notification-wrapper">
	<div class="notification {bgClass} {hidden ? 'hide' : ''}">
		<div class="notification-icon">
			<i class="fa-solid fa-bell"></i>
		</div>
		<div class="notification-body">
			<div class="notification-title">{title}</div>
			<div class="notification-text">{text}</div>
		</div>
		<div class="notification-icon">
			<i class="fa-solid fa-xmark close"></i>
		</div>
	</div>
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
</style>
