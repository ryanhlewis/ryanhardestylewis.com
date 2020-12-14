// The DocPad Configuration File
// It is simply a CoffeeScript Object which is parsed by CSON
const docpadConfig = {

	// =================================
	// Template Data
	// These are variables that will be accessible via our templates
	// To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

	templateData: {

		// Specify some site properties
		site: {
			// The production url of our website
			url: "https://www.amypavel.com",

			root: "https://www.amypavel.com",

			// Here are some old site urls that you would like to redirect from
			oldUrls: [
				'http://www.cs.berkeley.edu/~amypavel/',
				'http://eecs.berkeley.edu/~amypavel/',
				'http://people.eecs.berkeley.edu/~amypavel/',
				'http://www.amy-pavel.com',
			],

			// The default title of our website
			title: "Amy Pavel",

			// The website description (for SEO)
			description: `\
Personal website of Amy Pavel, Postdoctoral Scholar at Carnegie Mellon University, Research Scientist at Apple, and previously a Ph.D. student at UC Berkeley.\
`,

			// The website keywords (for SEO) separated by commas
			keywords: `\
amy pavel, video digests, sceneskim, sifter, video, human computer interaction, 360 video, hri, applied ai, applied ml, berkeley, eecs, uc berkeley, cs, computer science, hci, music\
`,

			// The website author's name
			author: "Amy Pavel",

			// The website author's email
			email: "amypavel@eecs.berkeley.edu"
		},

		// -----------------------------
		// Helper Functions

		// Get the prepared site/document title
		// Often we would like to specify particular formatting to our page's title
		// we can apply that formatting here
		getPreparedTitle() {
			// if we have a document title, then we should use that and suffix the site's title onto it
			if (this.document.title) {
				return `${this.document.title} | ${this.site.title}`;
			// if our document does not have it's own title, then we should just use the site's title
			} else {
				return this.site.title;
			}
		},

		// Get the prepared site/document description
		getPreparedDescription() {
			// if we have a document description, then we should use that, otherwise use the site's description
			return this.document.description || this.site.description;
		},

		// Get the prepared site/document keywords
		getPreparedKeywords() {
			// Merge the document keywords with the site keywords
			return this.site.keywords.concat(this.document.keywords || []).join(', ');
		},

		formatDate(d) {
			const day = d.getDate();
			const month = d.getMonth() + 1;
			const year = d.getFullYear();
			return `${month}/${day}/${year}`;
		},

		renderAuthors(authors, allAuthors) {
			if (typeof authors === 'string') {
				return authors;
			}
			const links = authors.map((id) => {
				const shared = id.endsWith('*');
				if (shared) {
					id = id.slice(0, id.length - 1);
				}
				const author = allAuthors[id];
				if (!author) {
					return '<b>AUTHOR NOT FOUND</b>';
				}
				const name = `${author.title}${shared ? '*' : ''}`;
				return author.link ? `<a href="${author.link}">${name}</a>` : name;
			})
			return links.join(', ');
		},
	},


	environments: {
		deploy: {
			templateData: {
				site: {
					root: "//amypavel.com"
				}
			}
		},

		development: {
			templateData: {
				site: {
					root: ""
				}
			}
		}
	},

	// =================================
	// Collections

	collections: {
		posts(database) {
			return database.findAllLive({relativeOutDirPath: {$startsWith: 'posts'}}, [{date:-1}]);
		},

		pubs(database) {
			const query =
				{relativeOutDirPath: {$startsWith: 'publications'}};

			const sorting =
				{date: -1};

			return database.findAllLive(query, sorting).on("add", pub => pub.setMeta({
                write: false
            }));
		},
		
		authors(database) {
			const query =
				{relativeOutDirPath: {$startsWith: 'people'}};

			const sorting =
				{date: -1};

			return database.findAllLive(query, sorting).on("add", pub => pub.setMeta({
				write: false
			}));
		},

		news(database) { 
			const query =
				{relativeOutDirPath: {$startsWith: 'news'}};

			const sorting = 
				{date: -1};
			
			return database.findAllLive(query, sorting).on("add", pub => pub.setMeta({
                write: false
            }));
		},
		
		highlights(database) { 
			const query = {
				relativeOutDirPath: { $startsWith: 'publications'
			},
				highlight: { $eq: true
			}
			};

			const sorting = 
				{date: -1};
			
			return database.findAllLive(query, sorting).on("add", pub => pub.setMeta({
                write: false
            }));
		},

		ongoing(database) {
			const query =
				{relativeOutDirPath: {$startsWith: 'ongoing'}};

			const sorting =
				{date: -1};

			return database.findAllLive(query, sorting).on("add", pub => pub.setMeta({
                write: false
            }));
		},

		classprojects(database) {
			const query =
				{relativeOutDirPath: {$startsWith: 'classprojects'}};

			const sorting =
				{date: -1};

			return database.findAllLive(query, sorting).on("add", pub => pub.setMeta({
                write: false
            }));
		},

		posters(database) {
			const query =
				{relativeOutDirPath: {$startsWith: 'posters'}};

			const sorting =
				{date: -1};

			return database.findAllLive(query, sorting).on("add", pub => pub.setMeta({
                write: false
            }));
		}
	},



	// =================================
	// DocPad Events

	// Here we can define handlers for events that DocPad fires
	// You can find a full listing of events on the DocPad Wiki
	events: {

		// Server Extend
		// Used to add our own custom routes to the server before the docpad routes are added
		serverExtend(opts) {
			// Extract the server from the options
			const {server} = opts;
			const {
                docpad
            } = this;

			// As we are now running in an event,
			// ensure we are using the latest copy of the docpad configuraiton
			// and fetch our urls from it
			const latestConfig = docpad.getConfig();
			const oldUrls = latestConfig.templateData.site.oldUrls || [];
			const newUrl = latestConfig.templateData.site.url;

			// Redirect any requests accessing one of our sites oldUrls to the new site url
			return server.use(function(req,res,next) {
				if (oldUrls.includes(req.headers.host)) {
					return res.redirect(newUrl+req.url, 301);
				} else {
					return next();
				}
			});
		}
	}
};

// Export our DocPad Configuration
module.exports = docpadConfig;
