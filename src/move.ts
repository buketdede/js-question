/**
 * @author: Buket Dede
 */

// INTERFACES:
interface File {
  id: string;
  name: string;
}

interface Folder {
  id: string;
  name: string;
  files: File[];
}

// FUNCTIONS:
/**
 * Name: move
 * Description: Function Move will take a FILE id as source and FOLDER id as destination and return the new List Stucture.
 * @param list - An Array of Folders
 * @param source - A FILE ID as a string
 * @param destination - A FOLDER ID as a string
 */

export default function move(list: Folder[], source: string, destination: string): Folder[] {
  // NOTE: My goal was to loop through this list only once, and get all the information needed while looping.
  // The Local Variables below will help to achieve that
  let indexOfDestinationFolder = -1;
  let indexOfSourceFolder = -1;
  let indexOfFIleToMove = -1;

  if (!list || list.length < 1) {
    throw new Error('You cannot move a folder');
  }
  list.forEach((folder: Folder, folderIndex: number) => {
    // Safety Check; If Folder is passed as File, We should throw an Error and Exit;
    if (folder.id === source) {
      throw new Error('You cannot move a folder');
    }

    // Get the Index of the Destination Folder,
    // because we could be moving a File from a folder in the end of the list to a folder in the top of the list
    if (folder.id === destination) {
      indexOfDestinationFolder = folderIndex;
    }

    // We will only loop through the FILES in the file is not found yet.
    if (indexOfFIleToMove === -1) {
      // Get the index of the File To Move, because it will be needed to delete the file from the source folder.
      indexOfFIleToMove = folder.files.findIndex((file: File) => {
        // Safety Check, if the FILE ID is passed as a Folder ID, we should throw an Error and Exit
        if (file.id === destination) {
          throw new Error('You cannot specify a file as the destination');
        }
        // If File Matches, Get the index of the source folder, so that we can delete it at the end.
        if (file.id === source) {
          indexOfSourceFolder = folderIndex;
        }
        return file.id === source;
      });
    }
  });

  // Safety Check, If any index is not found, means an error happened, we should throw an error and exit
  if (indexOfDestinationFolder === -1 || indexOfSourceFolder === -1 || indexOfFIleToMove === -1) {
    throw new Error('You cannot specify a file as the destination');
  }

  // At this we passed all the safety checks, we move the new file to the destination
  list[indexOfDestinationFolder].files.push(list[indexOfSourceFolder].files[indexOfFIleToMove]);
  // Then we delete the file from the source
  list[indexOfSourceFolder].files.splice(indexOfFIleToMove, 1);

  // Return the new list;
  return list;
}
