approve-data:
	cp ../../priconne-planner-data-lunatic/dist/characters.json src/assets/
	cp ../../priconne-planner-data-lunatic/dist/character-images/*.jpg src/assets/character-images/
	cp ../../priconne-planner-data-lunatic/dist/equipments.json src/assets/
	cp ../../priconne-planner-data-lunatic/dist/equipment-images/*.jpg src/assets/equipment-images/
	cp ../../priconne-planner-data/etc/hard.json src/assets/hards.json
	cp ../../priconne-planner-data/etc/normal.json src/assets/normals.json

serve:
	ng serve --base-href=/tools/priconne-planner/

deploy:
	ng build --prod
	tar cfz build.tgz dist/priconne-planner/
	scp build.tgz vps:~/
	ssh vps
