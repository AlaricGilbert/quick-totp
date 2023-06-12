import * as vscode from 'vscode';
import * as speakeasy from 'speakeasy';

export function activate(context: vscode.ExtensionContext) {
	let getCode = () => {
		let secret = vscode.workspace.getConfiguration('quick-totp').get('secret', '');
		let encoding = vscode.workspace.getConfiguration('quick-totp').get('encoding', 'base32');
		let step = vscode.workspace.getConfiguration('quick-totp').get('step', 30);
		let length = vscode.workspace.getConfiguration('quick-totp').get('length', 6);


		return speakeasy.totp({
			secret: secret,
			encoding: encoding as speakeasy.Encoding,
			step: step,
			length: length
		});
	};

	context.subscriptions.push(vscode.commands.registerCommand('quick-totp.copy', () => {
		vscode.env.clipboard.writeText(getCode());
	}));

	context.subscriptions.push(vscode.commands.registerCommand('quick-totp.login', () => {
		vscode.window.terminals.at(0)?.sendText(getCode(), true);
	}));
}

export function deactivate() {}
