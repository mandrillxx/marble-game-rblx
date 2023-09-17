interface Workspace extends Instance {
	CurrentCamera: Camera;
}

interface ReplicatedStorage extends Instance {
	Shared: Folder & {
		systems: Folder;
	};
	Client: Folder & {
		systems: Folder;
	};
}

interface SoundService extends Instance {}
