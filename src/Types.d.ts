interface Workspace extends Instance {}

interface ReplicatedStorage extends Instance {
	Shared: Folder & {
		systems: Folder;
	};
	Client: Folder & {
		systems: Folder;
	};
}

interface SoundService extends Instance {}
