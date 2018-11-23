approve-data:
	cp ../../priconne-planner-data/etc/characters.json src/assets
	cp ../../priconne-planner-data/etc/equipments.json src/assets
	cp ../../priconne-planner-data/etc/hard.json src/assets/hards.json
	cp ../../priconne-planner-data/etc/normal.json src/assets/normals.json

deploy:
	ng build --prod
	tar cfz build.tgz dist/priconne-planner/
	scp build.tgz vps:~/
	ssh vps
