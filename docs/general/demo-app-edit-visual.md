## Editing a pipeline representation

To edit a built pipeline visual representation the following operations are supported
* Delete a node (`call`)
    * Select one or more nodes by clicking them with a left mouse button - selected nodes will be highlighted (multiple selection is performed via *Shift+LMB*)
    
    ![pb-delete-select](images/pb-delete-select.png)

    * Click right mouse button and select *Delete* from a context menu

    ![pb-delete-menu](images/pb-delete-menu.png)

    * Nodes will be deleted
    * `Call` objects from a WDL script will be deleted as well

    ![pb-delete-done](images/pb-delete-done.png)

* Delete an edge (`link`)
    * Hover an edge with a mouse - *cross* icon will be shown above an edge
    
    ![pd-edge-hover](images/pd-edge-hover.png)

    * Click that icon with a left mouse button
    * Edge will be deleted
    * `Link` object from a WDL script will be deleted as well

    ![pd-edge-done](images/pd-edge-done.png)

* Modify node properties (`task`)
    * Select a node by clicking it with a left mouse button

    ![pb-prop-select](images/pb-prop-select.png)

    * Click right mouse button and select *Properties* from a context menu

    ![pb-prop-menu](images/pb-prop-menu.png)

    * A popup with a node details will be shown
    
    ![pb-prop-popup](images/pb-prop-popup.png)

    * The following properties can changed via a *Properties* popup
        * `Call` alias
        * `Task` command text
        * `Task`'s variables
        * `Task`'s outputs
    * If any of the properties is edited and saved - those changes will be reflected in a visual representation and WDL script as well
