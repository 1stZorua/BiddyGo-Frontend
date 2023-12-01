const generateLinks = (names: string[]) => names.map(name => ({ name, href: `#${name.toLowerCase().replace(/\s+/g, '-')}` }));

export const navigationLinks = [
	{
		title: 'BiddyGo',
		links: generateLinks(['About BiddyGo', 'Affiliate program', 'Careers', 'Help', 'Press', 'Sitemap'])
	},
	{
		title: 'Buyer Information',
		links: generateLinks(['Buyer terms', 'Law enforcement guidelines', 'Notarial oversight', 'Participating in the auction', 'Trustworthy business'])
	},
	{
		title: 'Seller Resources',
		links: generateLinks(['Photography advice', 'Self auctioning', 'Seller terms', 'Submission guidelines'])
	},
	{
		title: 'My BiddyGo',
		links: generateLinks(['Login', 'Sign up'])
	}
];