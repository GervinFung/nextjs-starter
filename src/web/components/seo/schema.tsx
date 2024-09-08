import Script from 'next/script';
import React from 'react';

const Schema = () => {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: (['home'] as const).map((name) => {
			return {
				name,
				'@type': 'ListItem',
				position: 1,
				item: `${process.env.DOMAIN}/${name === 'home' ? '' : name}`,
			};
		}),
	};

	return (
		<Script
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(structuredData, undefined, 4),
			}}
			type="application/ld+json"
		/>
	);
};

export default Schema;
