import os

def rename_logo_to_icon(directory):
    # Iterate through all files in the specified directory
    for filename in os.listdir(directory):
        # Check if '_logo' or '-logo' is in the filename
        if '-min.png' in filename: 
            # Create the new filename by replacing '_logo' or '-logo' with '-icon'
            new_filename = filename.replace('-min.png', '.png')
            
            # Get the full paths of the old and new filenames
            old_file_path = os.path.join(directory, filename)
            new_file_path = os.path.join(directory, new_filename)
            
            # Rename the file
            os.rename(old_file_path, new_file_path)
            print(f'Renamed: {filename} -> {new_filename}')

# Example usage:
directory_path = './'  # Replace with the actual directory path
rename_logo_to_icon(directory_path)