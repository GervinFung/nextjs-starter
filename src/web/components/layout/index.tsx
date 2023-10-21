import React from 'react';

const Layout = (props: Readonly<{ children: React.ReactNode }>) => {
	return <React.Fragment>{props.children}</React.Fragment>;
};

export default Layout;
