# certification-node

Problem: Design a web-application that allows users to communicate which items they have purchased off of their grocery list.

Solution:

This application allows users to do the following:

1) create lists of various categories (ie: groceries, clothes, etc.)

2) open these lists to input specific items (ie: cheese, yogurt, grapes)

3) mark these items as "purchased" or "unmark" the item as purchased if the button was hit on accident, etc.

Other:

-Users are requested to make a username upon entering the site. Multiple devices may sign in under the same user.

-Once a user is signed in, they are given access to view the various lists created, which will include the items they need to buy.

-from here they can access lists created by other members that they wish to collaborate with, as well as create their own.

Technical decisions:

1) Authorizations: I have created an admin account, however, any member may create a list, access another list, edit, delete, mark as purchased, etc. This is because I didn't want to force users who want to share the same list to be forced to log in under the same username in order to view the same lists.

-- if given more time, I would have granted a "permission" system where users may grant other users permission to access their lists- making it only available to the usernames of that user's choosing. For the time being, anyone can view any other list in order to account for large groups of shoppers.

2) Index Page: I wanted the home page to be simple and straightforward with a simple call to action. I wanted the user to NEED to sign in in order to continue forward, and be rewarded with the remaining content after doing so.

Overall:

  Testing: jasmine

  model: psql/Sequelize

  view: ejs

  framework: express

  I chose express because, although there is a bit of a learning curve because there aren't a lot of specifics to the framework, it allows you a lot of flexability and freedom to code as you please.

  I chose EJS for the view because it allowed me to work in HTLM and plain Javascript. With what I was trying to complete for this site, this felt like the most straightforward route to complete the given task in the shortest amount of time.

All the foundational pieces should be there. If I were given more time, I would love to focus more on the UI/UX portion by making the "mark as purchased" as well as "edit" and "delete" buttons directly on the items page, instead of needing to click on a separate "show item" page. There are also additional features I would like to add such as privacy settings where users can "choose" who they would like to view their lists and who would be allowed to edit.

Finally, it would be great to add additional features for max prices as well as coupon code API's.

Closing remarks:
My biggest focus on this project, in addition to fulfilling the minimum criteria, was creating an *accessible site*. I wanted to showcase my ability to create a site that has the ability to be navigated without a mouse, with a screen reader, etc.

Web accessible features:

-site that can be navigated through tabs without a mouse

-a hidden feature that skips the navbar for the tab feature

-tested for contrast with greyscale screen

-Tested with screen reader

-Forms with information inside of them listing what is requested so that screen readers can describe any requirements. 
