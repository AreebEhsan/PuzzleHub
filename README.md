# Web Development Final Project - *PuzzleHub*

Submitted by: **Areeb Ehsan**

**PuzzleHub** is an interactive platform for Rubik's cube enthusiasts to share solving techniques, discuss strategies, and compare solve times for various cube variations. Built with a focus on community engagement, the app allows users to create posts, leave comments, and interact with others by upvoting posts. PuzzleHub is your go-to hub for all things Rubik's cubes!

---

## Features

### Core Features
- **Post Creation**:
  - Users can create posts with a title, optional content, and an image (via external URL).
- **Home Feed**:
  - Displays all posts with their titles, upvotes, and creation timestamps.
  - Sort posts by:
    - Newest first
    - Most upvoted
  - Search for posts by title.
- **Post Details Page**:
  - View the complete details of a post, including content, images, and upvotes.
  - Add comments to posts and engage in discussions.
  - Upvote posts to show appreciation.

### Advanced Features
- **Post Management**:
  - Edit existing posts: Update the title, content, or image URL.
  - Delete posts and remove them from the platform.
- **Comments Section**:
  - Users can leave comments on any post.
  - All comments are displayed in chronological order.
- **Responsive Design**:
  - Accessible on both desktop and mobile devices.

---

## Tech Stack

### Frontend
- **React**: Core framework for building dynamic UI components.
- **React Router**: For seamless navigation between pages.
- **Vite**: A fast development environment for modern JavaScript projects.

### Backend
- **Supabase**: A powerful backend-as-a-service for database management and user authentication.

---

Time spent: **4** hours spent in total

## Required Features

The following **required** functionality is completed:

- [X] **A create form that allows the user to create posts**
- [X] **Posts have a title and optionally additional textual content and/or an image added as an external image URL**
- [X] **A home feed displaying previously created posts**
- [X] **By default, the time created, title, and number of upvotes for each post is shown on the feed**
- [X] **Clicking on a post shall direct the user to a new page for the selected post**
- [X] **Users can sort posts by either their created time or upvotes count**
- [X] **Users can search for posts by title**
- [X] **A separate post page for each created post, where any additional information is shown is linked whenever a user clicks a post**
- [X] **Users can leave comments underneath a post on the post's separate page**
- [X] **Each post should have an upvote button on the post's page. Each click increases its upvotes count by one and users can upvote any number of times**
- [X] **A previously created post can be edited or deleted from its post page**

The following **optional** features are implemented:

- [ ] Users can only edit and deleted posts or delete comments by entering the secret key, which is set by the user during post creation
- [ ] Upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them.
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface of the web app
- [ ] Users can share and view web videos
- [ ] Users can set flags while creating a post. Then users can filter posts by flags on the home feed.
- [ ] Users can upload images directly from their local machine as an image file
- [ ] Display a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://github.com/AreebEhsan/PuzzleHub/blob/main/PuzzleHub%20Demo.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with LiceCap



## License

    Copyright [2024] [Areeb Ehsan]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
