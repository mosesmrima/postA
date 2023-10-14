# PostA

PostA is a React mini web application built to demonstrate CRUD operations.
It uses [ https://jsonplaceholder.typicode.com/]( https://jsonplaceholder.typicode.com/)
dummy API.

## Accessing PostA

You can run it locally by cloning this repository and running the command below at the root directory of the project:

```bash
# Clone the repository
git clone https://github.com/mosesmrima/posta

# Change directory to the project folder
cd posta

# Install dependencies

npm install
# start the development server
npm start
```


You can also access an instance of PostA from the Link below:
 
#### [https://posta-lime.vercel.app/](https://posta-lime.vercel.app/)


## Allowed Operations
PostA enables users to:

- **View Posts:** Explore all available posts with titles, authors, and content.

- **Create Posts:** Generate new posts by providing a title and content.

- **Edit Post:** Modify their own posts by changing titles and content.

- **Delete Post:** Remove only the posts they've own.

**Note**: *A post is considered to be own by a particular use if the ID of
the user matches the user ID of associated with the post.*


## Security Feature
To mitigate **Broken Object Level Authorization (BOLA)** vulnerability, PostA simulates a logged-in user
by randomly selecting a user. A user is can view all posts but is only allowed 
to delete or edit belonging to them.
BOPLA vulnerability is listed as the top API vulnerability by OWASP, you can read more
on BOPLA and other API/Web Applications vulnerabilities from:

- [OWASP API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x00-header/)
- [OWASP Web Application Security Top 10](https://owasp.org/www-project-top-ten/)