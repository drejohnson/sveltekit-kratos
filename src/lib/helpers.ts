import type { UiNode, UiNodeInputAttributes } from '@ory/kratos-client';
import type { UiNodeAnchorAttributes, UiNodeTextAttributes } from '@ory/kratos-client/api';

const ui: { [key: string]: { title: string; position: number } } = {
	// You could add custom translations here if you want to:
	//
	'traits.email': {
		title: 'E-Mail',
		position: 1
	},
	'traits.name.first': {
		title: 'First Name',
		position: 2
	},
	'traits.name.last': {
		title: 'Last Name',
		position: 3
	},
	password: {
		title: 'Password',
		position: 4
	}
};

type Translations = typeof ui;

export const onlyNodes = (nodes: Array<UiNode>, only?: string) => {
	if (!only) {
		return nodes;
	}
	return nodes.filter(({ group }) => group === only);
};

export const getTitle = (n: UiNode): string => {
	switch (n.type) {
		case 'a':
			return (n.attributes as UiNodeAnchorAttributes).title.text;
		case 'img':
			return n.meta.label?.text || '';
		case 'input':
			const key = (n.attributes as UiNodeInputAttributes).name;
			if (n.meta?.label?.text) {
				// console.log('from getTitle', n.meta.label.text);
				return n.meta.label.text;
			} else if (key in ui) {
				return ui[key as keyof Translations].title;
			}
			return key;
		case 'text':
			return (n.attributes as UiNodeTextAttributes).text.text;
	}

	return '';
};

export const getType = (n: UiNode): string => {
	switch (n.type) {
		case 'a':
			return (n.attributes as UiNodeAnchorAttributes).title.text;
		case 'img':
			return n.meta.label?.text || '';
		case 'input':
			const key = (n.attributes as UiNodeInputAttributes).type;
			if (n.meta?.label?.text) {
				// console.log('from getAttribute', n.meta.label.text);
				return n.meta.label.text;
			} else if (key in ui) {
				return ui[key as keyof Translations].title;
			}
			return key;
	}

	return '';
};

export const getAttribute = (node: UiNode) => node.attributes as UiNodeInputAttributes;

// This helper function translates the html input type to the corresponding partial name.
export const uiNodeInputType = (node: UiNode) => {
	switch (node.type) {
		case 'input': {
			const attributes = node.attributes as UiNodeInputAttributes;
			switch (attributes.type) {
				case 'hidden':
					return 'hidden';
				case 'password':
					return 'password';
				case 'submit':
					return 'button';
				case 'checkbox':
					return 'checkbox';
				default:
					return 'default';
			}
		}
	}
	return 'default';
};
