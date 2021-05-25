import type { UiNode, UiNodeInputAttributes } from '@ory/kratos-client';
import type { UiNodeAnchorAttributes, UiNodeTextAttributes } from '@ory/kratos-client/api';
import config from '$lib/config';

const ui: { [key: string]: { title: string; position: number } } = {
	// You could add custom translations here if you want to:
	//
	// 'traits.email': {
	// 	title: 'E-Mail',
	// }
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

export const getAttribute = (node: UiNode) => node.attributes as UiNodeInputAttributes;

export const isString = (x: any): x is string => typeof x === 'string';

export const redirectOnError = (error: any, path: string) => {
	if ([401, 403, 404].includes(error.response.status)) {
		return {
			status: 302,
			redirect: `${config.kratos.public}${path}`
		};
	}
};
