---
layout: post
title: "Update Multi-user SharePoint Field with Flow"
description: "Updating a multi-user field for a SharePoint document with Flow turned out to be a more complex task than I initially anticipated. Here's the solution that worked for me and approaches that didn't work."
date: 2019-10-07 12:00

image: "/assets/2019/update-multi-user-field-flow-hero.jpg"

tags: [sharepoint, flow, office 365]
---

Updating a multi-user field for a SharePoint document with Flow turned out to be a more complex task than I initially anticipated. Here's the solution that worked for me and approaches that didn't work.

In my scenario, I had a SharePoint document library with a multi-user column `Interested in changes`. I wanted a Flow that users can run for a selected document to get added to this column even when they had no edit permissions. Another Flow would send them an email notification later if the document would change.

## Working solution

Here's an overview of the final solution:
![Flow overview]({{ site.baseurl }}/assets/2019/update-multi-user-field-flow-overview.jpg){: .image--original-size-small}

### Getting selected document details

We start by getting details about the selected document and initializing variables that will be used later. Variables will store the id of the current user and ids of users that are already in the `InterestedInChanges` field.
![Get item details and init variables]({{ site.baseurl }}/assets/2019/update-multi-user-field-flow-init.jpg){: .image--original-size-small}

Note that I'm using the Guid of the document library instead of the name in a Flow's trigger.

### Getting current user id

To update a multi-user field we need to know a site id of a user. Its value is not available by default and we need to get it with an additional action. The `Send HTTP request to SharePoint` action does that. The REST endpoint to return the user site id is `_api/web/SiteUsers/getByEmail('user_email')`. We're using the `User email` (the email address of the user who triggered the flow) as a parameter.

We save the result into the `CurrentUserId` variable using the following expression: `body('Send_an_HTTP_request_to_SharePoint_to_get_current_user_id')?['d']?['id']`.

![Get user id]({{ site.baseurl }}/assets/2019/update-multi-user-field-flow-user.jpg){: .image--original-size-small}

### Getting ids for users in list

Next we need to get site ids for users that have already been added to the `InterestedInChanges` column. The way to do that is the same as with the current user. We do that in a loop. After every request to SharePoint REST API for a user id, we add that id to the `InterestedInChanges` variable.

At the end of the loop, the `InterestedInChanges` variable would look something like `10, 6, 13`, where numbers are site ids of users in the field.
![Get other users ids]({{ site.baseurl }}/assets/2019/update-multi-user-field-flow-other-users.jpg){: .image--original-size-small}

### Updating the column

Now we are ready to update the multi-user field. We're using the `Send HTTP request to SharePoint` action to do that. Note the settings used for the action: `PATCH` method, `/_api/lists/getByTitle('Policies')/items(ID)` endpoint, `IF-MATCH, content-type` headers set, and the body value.

The body value used is the following:
```
{
    "__metadata": {
        "type": "SP.Data.PoliciesItem"
    },
    "InterestedInChangesId":
    {
        "results":
        [
            @{variables('InterestedInChanges')}
            @{variables('CurrentUserId')}
        ]
    }
}
```

You can get the value for the `type` property by requesting the https://YOUR-TENANT.sharepoint.com/sites/YOUR-SITE/_api/web/lists/getbytitle('YOUR-LIST')?$select=ListItemEntityTypeFullName endpoint. `d:ListItemEntityTypeFullName` will contain the value for your library.

Note that we're referencing the `InterestedInChangesId` and not `InterestedInChanges` as a field to update. The `results` property will contain the concatenated list of already added users' ids and the site id of the current user.

![Get other users ids]({{ site.baseurl }}/assets/2019/update-multi-user-field-flow-other-update.jpg){: .image--original-size-small}

This flow once triggered will add a current user to the `InterestedInChanges` column.

## What didn't work

Here are some approaches I've tried along the way which did not work for me.

### Update field with Send request to SharePoint

You'll get the `"The request ETag value '' does not match the object's ETag value"` error if you'll forget to specify the `IF-MATCH` header with either `*` or Etag value.

You'll get the `"The property '__metadata' does not exist on type 'SP.Data.PoliciesItem'. Make sure to only use property names that are defined by the type"` error if you'll forget to specify the `content-type` header with the `application/json;odata=verbose` value.

You'll get the `"A node of type 'PrimitiveValue' was read from the JSON reader when trying to read the entries of a feed. A 'StartObject' or 'EndArray' node was expected"` error if you'll use the `InterestedInChanges` as a target field for an update (i.e. the actual name of the field). You need to use your column name with `"Id"` at the end (`InterestedInChangesId` in my case).

### Update field with Update file properties

I've tried to use the `Update file properties` initially and didn't work well. You can update a single value with the action, it works fine. However, for multiple values is stops working.


It is possible to specify a value for the multi-user field in manual mode:
![Update file properties]({{ site.baseurl }}/assets/2019/update-multi-user-field-flow-other-update-file.jpg){: .image--original-size-small}
```
[
  {
    "Claims": user1
  },
  {
    "Claims": user2
  }
  ...
]
```

In case of a single value, the action updates the field properly. If there is more than one value, it runs without errors, but the value of the field is not updated.
