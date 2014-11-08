# Download the Bootstrap CSS before running this
# https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.css

import re

with open('bootstrap.css', 'r') as f:
	css = f.read()

# Matches a class name or comma-separated list of class names
# matches = re.findall("(?:(\.[a-zA-Z0-9\-]+)\s*,?\s*)+\{",css)
matches = re.findall("(?:(\.[a-zA-Z0-9\-]+)[\s,]*)+\{",css)
uniques = set(matches)

with open('bootstrap-full-class-list.txt', 'w+') as f:
	for m in sorted(uniques):
		f.write("%s\n" % m)
		
		
"""

	Doesn't catch:
		btn-lg
			appears in ".dropup .btn-lg .caret {"
		btn-group-sm which only appears in a child selector
			.btn-group-sm > .btn {

"""