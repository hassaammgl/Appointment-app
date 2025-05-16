import { AppLayout } from "@/layout/Applayout";
import { useSettings } from "@/store/settings";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
	const { resetSettings, settings, updateSetting } = useSettings();

	return (
		<AppLayout>
			<div className="space-y-6 max-w-xl mx-auto mt-10">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Settings
					</h1>
					<p className="text-muted-foreground">
						View and manage your system setup
					</p>
				</div>

				<div className="space-y-4">
					{/* Toggle: Add Notes */}
					<div className="flex items-center justify-between p-4 rounded-xl border shadow-sm">
						<Label htmlFor="add-notes">Enable Notes Field</Label>
						<Switch
							id="add-notes"
							checked={settings.addNotes}
							onCheckedChange={(val) =>
								updateSetting("addNotes", val)
							}
						/>
					</div>

					<div className="flex items-center justify-between p-4 rounded-xl border shadow-sm">
						<Label htmlFor="add-purpose">
							Enable Purpose Field
						</Label>
						<Switch
							id="add-purpose"
							checked={settings.addPurpose}
							onCheckedChange={(val) =>
								updateSetting("addPurpose", val)
							}
						/>
					</div>

					<div className="flex items-center justify-between p-4 rounded-xl border shadow-sm">
						<Label htmlFor="add-cnic">Enable ID No. Field</Label>
						<Switch
							id="add-cnic"
							checked={settings.addPersonCnic}
							onCheckedChange={(val) =>
								updateSetting("addPersonCnic", val)
							}
						/>
					</div>
					<div className="flex items-center justify-between p-4 rounded-xl border shadow-sm">
						<Label htmlFor="add-contact">
							Enable Contact Field
						</Label>
						<Switch
							id="add-contact"
							checked={settings.addPersonContact}
							onCheckedChange={(val) =>
								updateSetting("addPersonContact", val)
							}
						/>
					</div>

					<div className="pt-4 w-full relative">
						<Button
							variant="destructive"
							onClick={resetSettings}
							className="w-36 absolute right-0"
						>
							Reset to Defaults
						</Button>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

export default SettingsPage;
